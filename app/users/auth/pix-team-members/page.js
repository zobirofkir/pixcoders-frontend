'use client';

import React from 'react';
import teamMembersData from '@/src/data/teamMembersData';
import TeamHeaderComponent from '@/components/auth/team/TeamHeaderComponent';
import TeamMemberCardComponent from '@/components/auth/team/TeamMemberCardComponent';
import JoinTeamComponent from '@/components/auth/team/JoinTeamComponent';

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TeamHeaderComponent />
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembersData.map((member) => (
            <TeamMemberCardComponent key={member.id} member={member} />
          ))}
        </div>

        <JoinTeamComponent />
      </div>
    </div>
  );
};

export default page;