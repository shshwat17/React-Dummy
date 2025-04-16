const WrappedComponentMiddleware = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} name="adwaw" />;
};

export default WrappedComponentMiddleware;
