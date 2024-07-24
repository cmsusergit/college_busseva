import db from 'pocketbase'
import { env } from '$env/dynamic/public'

import { writable } from 'svelte/store'
const pb=new db(env.PUBLIC_PB_URL)
pb.autoCancellation(false)
export const currentUser = writable(pb.authStore.model)
export default pb









