// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// export interface Project {
//   id: string;
//   owner_id: string;
//   created_at: string;
// }

// export const useProjects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProjects = async () => {
//       setLoading(true);
//       const { data, error } = await supabase.rpc("get_projects");

//       if (!isMounted) return;

//       if (error) {
//         setError(error.message);
//         setProjects([]);
//       } else {
//         setProjects(data ?? []);
//         setError(null);
//       }

//       setLoading(false);
//     };

//     fetchProjects();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return { projects, loading, error };
// };
