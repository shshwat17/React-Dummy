import { Component } from "react";

class CustomErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    // console.log(error);
  }

  render() {
    if (this.state?.hasError) {
      return <h1>Something Went wrong</h1>;
    }
    return this.props.children;
  }
}

export default CustomErrorBoundary;
