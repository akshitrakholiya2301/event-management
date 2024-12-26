import React from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/css/bootstrap-icons.css';
import "./assets/css/icon.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import { RootState } from './redux/store';
import { connect } from 'react-redux';
import AppRouter from './routes';

/**
 * App Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the App component
 */
function App(props) {
  /** Flag variable for toaster position */
  const flg = false;

  return (
    <div >
      {/* Toaster component for displaying notifications */}
      <Toaster position="top-right" reverseOrder={flg} />
      {/* Loader component to show loading indicator */}
      <Loader loading={props.appReducer.loading} />
      {/* AppRouter component for routing */}
      <AppRouter />


    </div>
  );
}



const mapStateToProps = (state: RootState) => {
  return { appReducer: state.loaderReducer };
};

const mapDispatchToProps = (): any => {

};
export default connect(mapStateToProps, mapDispatchToProps)(App);
