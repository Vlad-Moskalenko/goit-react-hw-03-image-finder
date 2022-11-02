import './loader.css';

import { Vortex } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  );
}
