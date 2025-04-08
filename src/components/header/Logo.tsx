
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div>
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          MyToolbox
        </h1>
        <p className="text-xs text-muted-foreground">
          Fast. Free. Fluid.
        </p>
      </div>
    </Link>
  );
};

export default Logo;
