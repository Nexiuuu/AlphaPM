import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export const subscribeToAuthChanges = (
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) => supabase.auth.onAuthStateChange(callback).data.subscription;
