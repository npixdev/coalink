import { BiopageRenderer } from '@/components/biopage/BiopageRenderer';
import { getUserProfile } from '@/actions/profile';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const profile = await getUserProfile(username);
    
    if (!profile) {
        notFound();
    }
    
    return <BiopageRenderer profile={profile} />;
}
