import { NextPage } from 'next';
import ServiceLayout from '@/models/components/ServiceLayout';

const IndexPage: NextPage = function () {
    return <ServiceLayout title="Title">Content</ServiceLayout>;
};

export default IndexPage;
