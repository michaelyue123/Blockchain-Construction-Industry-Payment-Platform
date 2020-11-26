import React from 'react';
import OwnerHome from './content-page/owner/OwnerHome';
import LeadHome from './content-page/lead/LeadHome';
import ContractorHome from './content-page/contractor/ContractorHome';
import OwnerDashboard from './content-page/owner/OwnerDashboard';
import LeadDashboard from './content-page/lead/LeadDashboard';
import ContractorBoard from './content-page/contractor/ContractorDashboard';
import ProfileView from './content-page/profile';
import OwnerProject from './content-page/owner/OwnerProjectView';
import LeadProject from './content-page/lead/LeadProject';
import ContractorContract from './content-page/contractor/ContractorContract';
import ProjectView from './content-page/dashboard/common/project';
import Invitation from './content-page/invitation';
import ContractView from './content-page/owner/OwnerContractView';
import ContractListView from './content-page/dashboard/common/contract';


const AppRoutes = [
    {
        path: '/',
        element: <OwnerHome />,
        children: [
            { path: 'ownerProfile', element: <ProfileView /> },      
            { path: 'owner', element: <OwnerDashboard /> },
            { path: 'ownerCreateProject', element: <OwnerProject /> },
            { path: 'ownerViewProject', element: <ProjectView /> },
            { path: 'ownerInvitation', element: <Invitation /> },
            { path: 'ownerContract', element: <ContractView /> },
            { path: 'ownerViewContract', element: <ContractListView /> }
        ]
    },
    {
        path: '/',
        element: <LeadHome />,
        children: [
            { path: 'leadProfile', element: <ProfileView /> },     
            { path: 'lead', element: <LeadDashboard /> },
            { path: 'leadCreateProject', element: <LeadProject /> }, 
            { path: 'leadViewProject', element: <ProjectView /> } ,
            { path: 'leadInvitation', element: <Invitation /> },
            { path: 'leadViewContract', element: <ContractListView /> }
     
        ]
    },
    {
        path: '/',
        element: <ContractorHome />,
        children: [
            { path: 'contractorProfile', element: <ProfileView /> },     
            { path: 'contractor', element: <ContractorBoard /> },
            { path: 'contractorContract', element: <ContractorContract /> },
            { path: 'contractorInvitation', element: <Invitation /> },
            { path: 'contractViewContract', element: <ContractListView /> }
           
        ]
    }
];

export default AppRoutes;
