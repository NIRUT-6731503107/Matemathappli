
-- Allow users to also see matches where they are the target (needed for mutual match detection)
CREATE POLICY "Users can view matches targeting them"
ON public.matches
FOR SELECT
USING (auth.uid() = target_user_id);
