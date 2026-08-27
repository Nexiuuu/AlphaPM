import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  publicNickname?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const registerUser = async ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  publicNickname,
}: RegisterCredentials) => {
  if (password !== confirmPassword) {
    throw new Error("Hasła nie są takie same.");
  }

  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();
  const normalizedNickname = publicNickname?.trim();

  if (!normalizedFirstName || !normalizedLastName) {
    throw new Error("Imię i nazwisko są wymagane.");
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        first_name: normalizedFirstName,
        last_name: normalizedLastName,
        ...(normalizedNickname
          ? { public_nickname: normalizedNickname }
          : {}),
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

export const loginUser = async ({ email, password }: LoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
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
