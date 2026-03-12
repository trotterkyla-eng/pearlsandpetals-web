// app/i/[token]/page.tsx
// Invite gate — grand ballroom atmosphere

import { createClient } from ‘@supabase/supabase-js’
import { redirect } from ‘next/navigation’
import InviteGateClient from ‘./InviteGateClient’

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const dynamic = ‘force-dynamic’

export default async function InviteGatePage({
params,
}: {
params: { token: string }
}) {
const { data: token } = await supabase
.from(‘invite_tokens’)
.select(’*’)
.eq(‘slug’, params.token)
.single()

if (!token) redirect(’/i/closed’)

const now = new Date()
const expired = token.expires_at && new Date(token.expires_at) < now
const capped   = token.use_limit && token.use_count >= token.use_limit

if (expired || capped) redirect(’/i/closed’)

return <InviteGateClient tokenSlug={params.token} />
}
