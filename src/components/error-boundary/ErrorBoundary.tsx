import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props, { error: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: true,
    });
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
