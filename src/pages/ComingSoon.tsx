
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout';
import PageContainer from '@/components/PageContainer';
import BackButton from '@/components/BackButton';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title = "Coming Soon", 
  description = "This tool is under development and will be available soon." 
}) => {
  return (
    <Layout>
      <Helmet>
        <title>{title} | Coming Soon - MyToolbox</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <PageContainer>
        <BackButton />
        <div className="max-w-3xl mx-auto text-center mt-10 mb-20">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping-slow"></div>
            <div className="relative bg-purple-600 text-white p-4 rounded-full">
              <Clock className="w-10 h-10" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {title} 
            <span className="inline-flex items-center ml-2 px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full">
              Coming Soon
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center gap-4 text-left">
            <AlertTriangle className="text-amber-500 w-10 h-10 shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-400">Development In Progress</h3>
              <p className="text-amber-700 dark:text-amber-500 text-sm mt-1">
                We're working hard to make this tool available as soon as possible. Please check back later or subscribe to our newsletter for updates.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button className="min-w-[200px]">
                Explore Available Tools
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default ComingSoon;
