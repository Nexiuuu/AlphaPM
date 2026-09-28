import { NotAuthenticatedError } from "../../errors/NotAuthenticatedError";
import { supabase } from "../utils/API/supabase";

export async function getAuthenticatedSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new NotAuthenticatedError();
  }

  return session;
}
