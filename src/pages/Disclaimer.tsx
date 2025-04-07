
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - EveryTools</title>
        <meta name="description" content="Read important disclaimers regarding the use of EveryTools services and tools." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
          <div className="glass-card p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <h2 className="text-xl font-semibold mt-6 text-foreground">1. Interpretation and Definitions</h2>
              <h3 className="text-lg font-medium mt-4 text-foreground">Interpretation</h3>
              <p>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. 
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              
              <h3 className="text-lg font-medium mt-4 text-foreground">Definitions</h3>
              <p>For the purposes of this Disclaimer:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Disclaimer) refers to EveryTools.</li>
                <li><strong>Service</strong> refers to the tools and applications provided on the EveryTools website.</li>
                <li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                <li><strong>Website</strong> refers to EveryTools, accessible from https://everytools.site</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">2. Disclaimer</h2>
              <p>
                The information contained on the EveryTools website is for general information purposes only. The Company assumes 
                no responsibility for errors or omissions in the contents of the Service.
              </p>
              <p className="mt-2">
                In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages 
                or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in 
                connection with the use of the Service or the contents of the Service. The Company reserves the right to make 
                additions, deletions, or modifications to the contents on the Service at any time without prior notice.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">3. No Warranties</h2>
              <p>
                The EveryTools website and all tools are provided "as is," with no warranties whatsoever. The Company makes no 
                express or implied warranties or representations with respect to the accuracy, reliability, completeness, 
                quality, performance, or fitness for a particular purpose of its services or tools.
              </p>
              <p className="mt-2">
                All services and tools, especially those involving file conversion, PDF manipulation, and other document 
                processing are provided without guarantee of results. The accuracy, completeness, and quality of conversions 
                may vary depending on the source files and technical limitations.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">4. External Links</h2>
              <p>
                The Service may contain links to external websites that are not provided or maintained by or in any way 
                affiliated with the Company. Please note that the Company does not guarantee the accuracy, relevance, 
                timeliness, or completeness of any information on these external websites.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">5. Errors and Omissions</h2>
              <p>
                The information given by the Service is for general guidance on matters of interest only. Even if the 
                Company takes every precaution to ensure that the content of the Service is both current and accurate, 
                errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, 
                omissions or inaccuracies in the information contained on the Service.
              </p>
              <p className="mt-2">
                The Company is not responsible for any errors or omissions, or for the results obtained from the use of 
                this information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 text-foreground">6. Fair Use Disclaimer</h2>
              <p>
                The Company may use copyrighted material which has not always been specifically authorized by the copyright 
                owner. The Company is making such material available for criticism, comment, news reporting, teaching, 
                scholarship, or research.
              </p>
              <p className="mt-2">
                The Company believes this constitutes a "fair use" of any such copyrighted material as provided for in 
                section 107 of the United States Copyright law.
              </p>
              <p className="mt-2">
                If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, 
                You must obtain permission from the copyright owner.
              </p>
              
              <p className="mt-10 text-sm">
                Last Updated: April 7, 2025
              </p>
              
              <p className="mt-6 text-sm">
                If you have any questions about this Disclaimer, please contact us at support@everytools.site.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;
