import {getConfig} from "@/lib/pages/configs";
import {DetailsProvider} from "@/components/Views/Detail/store/details-context";
import {Component} from "react";

export default function DetailsWrapper(DetailsComponent) {

  // eslint-disable-next-line
  return class extends Component {
    render() {
      const {id, route} = this.props
      const config = id ? getConfig(route).edit(id) : getConfig(route).create

      return (
        <DetailsProvider config={config}>
          <DetailsComponent config={config} {...this.props}/>
        </DetailsProvider>
      )
    }
  }
}