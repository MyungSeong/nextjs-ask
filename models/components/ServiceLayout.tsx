import Head from 'next/head';
import { ReactNode } from 'react';

interface Props {
    title: string;
    children: ReactNode;
}

const ServiceLayout = function ({ title = 'title', children }: Props) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
};

export default ServiceLayout;
