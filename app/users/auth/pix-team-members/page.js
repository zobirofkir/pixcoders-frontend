'use client';

import React from 'react';
import TeamHeader from '@/src/components/team/TeamHeaderComponent';
import TeamMemberCard from '@/src/components/team/TeamMemberCardComponent';
import JoinTeam from '@/src/components/team/JoinTeamComponent';
import teamMembers from '@/src/data/teamMembers';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TeamHeader />
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <JoinTeam />
      </div>
    </div>
  );
};

export default TeamPage;