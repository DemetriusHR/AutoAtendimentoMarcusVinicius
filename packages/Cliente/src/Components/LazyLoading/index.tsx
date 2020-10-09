import React, {
  Suspense,
} from 'react';
import LoadingComponent from '../Loading';

function LazyLoading(
  Component: React.ElementType,
  extras: JSX.ElementAttributesProperty = {
    props:
      '',
  }
) {
  return (
    props: JSX.ElementAttributesProperty
  ) => (
    <Suspense
      fallback={
        <LoadingComponent />
      }
    >
      <Component
        {...props}
        {...extras.props}
      />
    </Suspense>
  );
}

export default LazyLoading;
