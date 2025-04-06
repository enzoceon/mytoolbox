
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - EveryTools</title>
        <meta name="description" content="Learn about how EveryTools uses cookies on our website to enhance your browsing experience." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
        <div className="glass-card p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">What Are Cookies</h2>
            <p className="mb-4 text-muted-foreground">
              As is common practice with almost all professional websites, this site uses cookies, 
              which are tiny files that are downloaded to your computer, to improve your experience. 
              This page describes what information they gather, how we use it, and why we sometimes 
              need to store these cookies. We will also share how you can prevent these cookies from 
              being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">How We Use Cookies</h2>
            <p className="mb-4 text-muted-foreground">
              We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, 
              there are no industry standard options for disabling cookies without completely disabling 
              the functionality and features they add to this site. It is recommended that you leave 
              on all cookies if you are not sure whether you need them or not in case they are used 
              to provide a service that you use.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Disabling Cookies</h2>
            <p className="mb-4 text-muted-foreground">
              You can prevent the setting of cookies by adjusting the settings on your browser 
              (see your browser Help for how to do this). Be aware that disabling cookies will 
              affect the functionality of this and many other websites that you visit. Disabling 
              cookies will usually result in also disabling certain functionality and features 
              of this site. Therefore it is recommended that you do not disable cookies.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">The Cookies We Set</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Site preferences cookies</h3>
            <p className="mb-4 text-muted-foreground">
              In order to provide you with a great experience on this site, we provide the 
              functionality to set your preferences for how this site runs when you use it. 
              In order to remember your preferences, we need to set cookies so that this 
              information can be called whenever you interact with a page is affected by 
              your preferences.
            </p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Third-Party Cookies</h3>
            <p className="mb-4 text-muted-foreground">
              In some special cases, we also use cookies provided by trusted third parties. 
              The following section details which third party cookies you might encounter 
              through this site.
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground">
              <li className="mb-2">
                This site uses Google Analytics which is one of the most widespread and trusted 
                analytics solutions on the web for helping us to understand how you use the site 
                and ways that we can improve your experience. These cookies may track things such 
                as how long you spend on the site and the pages that you visit so we can continue 
                to produce engaging content.
              </li>
              <li className="mb-2">
                We also use Google AdSense cookies to serve advertisements on our site. These cookies 
                are used to personalize the advertisements that we show to you so that they are 
                meaningful to you. These cookies also help us to keep track of the efficiency of our 
                advertising campaigns.
              </li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">More Information</h2>
            <p className="mb-4 text-muted-foreground">
              Hopefully that has clarified things for you and as was previously mentioned, if there 
              is something that you aren't sure whether you need or not, it's usually safer to leave 
              cookies enabled in case it does interact with one of the features you use on our site.
            </p>
            <p className="mb-4 text-muted-foreground">
              However, if you are still looking for more information, then you can contact us through 
              one of our preferred contact methods:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Email: everytoolssite@gmail.com</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Cookies;
