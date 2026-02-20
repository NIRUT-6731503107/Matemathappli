
-- Fix 1: Restrict user_interests SELECT to authenticated users only
DROP POLICY IF EXISTS "Users can view all interests" ON public.user_interests;
CREATE POLICY "Authenticated users can view interests" ON public.user_interests
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fix 2: Fix matches SELECT policy - users can only see their own swipes (not who swiped on them)
DROP POLICY IF EXISTS "Users can view own matches" ON public.matches;
CREATE POLICY "Users can view own swipes" ON public.matches
  FOR SELECT USING (auth.uid() = user_id);

-- Fix 3: Add message content length constraint via trigger (more flexible than CHECK constraint)
CREATE OR REPLACE FUNCTION public.validate_message_content()
RETURNS TRIGGER AS $$
BEGIN
  IF length(NEW.content) > 10000 THEN
    RAISE EXCEPTION 'Message content exceeds maximum length of 10000 characters';
  END IF;
  IF length(trim(NEW.content)) = 0 THEN
    RAISE EXCEPTION 'Message content cannot be empty';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS validate_message_content_trigger ON public.messages;
CREATE TRIGGER validate_message_content_trigger
  BEFORE INSERT OR UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.validate_message_content();
