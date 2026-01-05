import supabase from "../db.js";

export async function insertUser( username, password_hash ) {
    const {data, error} = await supabase.from("users_bcrypt").insert({username, password_hash}).select().single()
    if (error) throw error;
    return data
}

export async function getUser( username ) {
    const {data, error} = await supabase.from("users_bcrypt").select("*").eq("username", username).single()
    if (error) throw error;
    return data
}

