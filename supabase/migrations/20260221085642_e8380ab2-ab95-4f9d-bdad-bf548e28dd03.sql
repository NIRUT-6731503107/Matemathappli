-- Fix: Restrict messages UPDATE to only allow changing the 'read' column
DROP POLICY IF EXISTS "Users can mark messages as read" ON public.messages;
CREATE POLICY "Users can mark messages as read" ON public.messages
  FOR UPDATE
  USING (auth.uid() = receiver_id)
  WITH CHECK (
    auth.uid() = receiver_id AND
    read = true AND
    content = (SELECT m.content FROM public.messages m WHERE m.id = messages.id) AND
    sender_id = (SELECT m.sender_id FROM public.messages m WHERE m.id = messages.id) AND
    receiver_id = (SELECT m.receiver_id FROM public.messages m WHERE m.id = messages.id) AND
    created_at = (SELECT m.created_at FROM public.messages m WHERE m.id = messages.id)
  );