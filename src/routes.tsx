import React, { useEffect, useState } from 'react'
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
import { getToken, isEmptyObjectOrNullUndefiend, isNullUndefinedOrBlank } from './Utility/Helper';
import Login from './pages/auth/Login/Login';
import Dashboard from './pages/donor/Dashboard/Dashboard';
import { RouterProps } from './interfaces';
import { ENUMFORROUTES } from './interfaces/interface';
import Sidebar from './components/Sidebar/Sidebar';
import GuestRoute from './common/GuestRoute';
import AuthRoute from './common/AuthRoute';
import NotFound from './components/NotFound/NotFound';
import { jwtDecode } from "jwt-decode";
import Navbar from './components/Navbar/Navbar';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword';
import SignUp from './pages/auth/SignUp/SignUp';
import AllCharity from './pages/donor/AllCharity/AllCharity';
import AllCharityDetails from './pages/donor/AllCharity/AllCharityDetails';
import MyCharity from './pages/donor/MyCharity/MyCharity';
import ApprovedCharityDetails from './pages/donor/MyCharity/ApprovedCharityDetails';
import CreateCharity from './pages/donor/MyCharity/CreateCharity';
import OurBlogs from './pages/donor/OurBlogs/OurBlogs';
import CreateBlog from './pages/donor/OurBlogs/CreateBlog';
import SingleBlog from './pages/donor/OurBlogs/singleBlog';
import Settings from './pages/donor/Settings/Settings';
import MySubscriptions from './pages/donor/MySubscriptions/MySubscriptions';
import SingleCharity from './pages/donor/MySubscriptions/SingleCharity';
import PageNotFound from './components/PageNotFound/PageNotFound';

/** Define private  routes */
const privateRoutes: RouterProps[] = [
  {
    path: ENUMFORROUTES.DASHBOARD,
    component: <Dashboard />,
    caseSensitive: true,
    url: ENUMFORROUTES.DASHBOARD,
  },
  {
    path: ENUMFORROUTES.All_CHARITY,
    component: <AllCharity />,
    caseSensitive: true,
    url: ENUMFORROUTES.All_CHARITY,
  },
  {
    path: ENUMFORROUTES.All_CHARITY_DETAILS,
    component: <AllCharityDetails />,
    caseSensitive: true,
    url: ENUMFORROUTES.All_CHARITY_DETAILS,
  },
  {
    path: ENUMFORROUTES.MY_CHARITY,
    component: <MyCharity />,
    caseSensitive: true,
    url: ENUMFORROUTES.MY_CHARITY,
  },
  {
    path: ENUMFORROUTES.APPROVED_CHARITY_DETAILS,
    component: <ApprovedCharityDetails />,
    caseSensitive: true,
    url: ENUMFORROUTES.APPROVED_CHARITY_DETAILS,
  },
  {
    path: ENUMFORROUTES.CREATE_CHARITY,
    component: <CreateCharity />,
    caseSensitive: true,
    url: ENUMFORROUTES.CREATE_CHARITY,
  },
  {
    path: ENUMFORROUTES.CREATE_CHARITY_ALL,
    component: <CreateCharity />,
    caseSensitive: true,
    url: ENUMFORROUTES.CREATE_CHARITY_ALL,
  },
  {
    path: ENUMFORROUTES.OUR_BLOGS,
    component: <OurBlogs />,
    caseSensitive: true,
    url: ENUMFORROUTES.OUR_BLOGS,
  },
  {
    path: ENUMFORROUTES.CREATE_BLOG,
    component: <CreateBlog />,
    caseSensitive: true,
    url: ENUMFORROUTES.CREATE_BLOG,
  },
  {
    path: ENUMFORROUTES.SINGLE_BLOG,
    component: <SingleBlog />,
    caseSensitive: true,
    url: ENUMFORROUTES.SINGLE_BLOG,
  },
  {
    path: ENUMFORROUTES.SETTINGS,
    component: <Settings />,
    caseSensitive: true,
    url: ENUMFORROUTES.SETTINGS,
  },
  {
    path: ENUMFORROUTES.MY_SUBSCRIPTION,
    component: <MySubscriptions />,
    caseSensitive: true,
    url: ENUMFORROUTES.MY_SUBSCRIPTION,
  },
  {
    path: ENUMFORROUTES.SINGLE_CHARITY,
    component: <SingleCharity />,
    caseSensitive: true,
    url: ENUMFORROUTES.SINGLE_CHARITY,
  },


];
/** Define public Routes */
const publicRoutes: RouterProps[] = [
  {
    path: "/",
    component: <Login />,
    caseSensitive: true,
  },
  {
    path: ENUMFORROUTES.LOGIN,
    component: <Login />,
    caseSensitive: true,
  },
  {
    path: ENUMFORROUTES.FORGOTPASSWORD,
    component: <ForgotPassword />,
    caseSensitive: true,
  },
  {
    path: ENUMFORROUTES.SIGNUP,
    component: <SignUp />,
    caseSensitive: true,
  },
  {
    path: ENUMFORROUTES.PGAE_NOT_FOUND,
    component: <PageNotFound />,
    caseSensitive: true,
  },


  // {
  //     path: "/access-denied",
  //     component: <AccessDenied />,
  //     caseSensitive: true,
  // },

];

/**
 * AppRouter Component
 * @param {object} props - Props passed to the component
 * @returns {JSX.Element} JSX element representing the AppRouter component
 */
const AppRouter = (props): JSX.Element => {
  /** Check if the user is authenticated  */
  const isAuthenticated = getToken() !== null ? true : false;
  /** State to manage private route list */
  const [privateRouteList, setPrivateRouteList] = useState<RouterProps[]>([]);
  //roles and Righs Start
  // useEffect(() => {

  //   if (isAuthenticated === false) {
  //     const routeList = [...privateRoutes];
  //     const updatePageData = routeList.map((val) => {
  //       val.component = getPageJsx(val.path, "");
  //       val.accessType = "";
  //       return val;
  //     });

  //     setPrivateRouteList(updatePageData);
  //     return;
  //   }

  // let token: any = localStorage.getItem("token");

  //  const decode: any = jwtDecode(token);
  //  console.log(decode,"decode value");
  //   const decode: any =[ENUMFORROUTES.DASHBOARD,ENUMFORROUTES.REPORTS]
  //   const newPageData = [...decode];

  //   const routeList = [...privateRoutes];
  //   const updatePageData = routeList.filter((val) => {
  //     newPageData.map((item, index) => {
  //       if (!isNullUndefinedOrBlank(item.accessType)) {

  //         if (val.url === item.url) {
  //           val.accessType = item.accessType;
  //         }
  //         val.component = getPageJsx(val.path, val.accessType);
  //       }
  //     })

  //     return val;
  //   })
  // console.log(newPageData,"api Route");
  //   setPrivateRouteList(updatePageData);


  // }, [isAuthenticated]);



  // const getPageJsx = (url, accessType) => {
  //   let jsx: any = null;

  //   switch (url) {

  //     case ENUMFORROUTES.DASHBOARD:
  //       jsx = <Dashboard accessType={accessType} />
  //       break;
  //     case ENUMFORROUTES.REPORTS:
  //       jsx = <Reports accessType={accessType} />
  //       break;


  //     default:
  //       break;
  //   }
  //   return jsx;
  // }
  React.useEffect(() => {
    document.documentElement.setAttribute('data-layout', 'vertical');
    document.documentElement.setAttribute('data-sidebar-size', 'lg');

    // var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    // if (verticalOverlay) {
    //   verticalOverlay[0].addEventListener("click", function () {
    //     document.body.classList.remove("vertical-sidebar-enable");
    //   });
    // }

    const windowSize = document.documentElement.clientWidth;
    if (windowSize == 768) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm');
    }
  }, [isAuthenticated]);





  // return (
  //   <div className={isAuthenticated  && !window.location.href.includes(ENUMFORROUTES.ACCESS_DENIED)  ? 'layout-wrapper' : ''} id={isAuthenticated  && !window.location.href.includes(ENUMFORROUTES.ACCESS_DENIED) ? "layout-wrapper" : ''}>

  //     <Router>
  //       {isAuthenticated && props.defaultRedux && <Navbar />}
  //       {isAuthenticated && props.defaultRedux && <Sidebar />}
  //       <div className={isAuthenticated ? 'main-content' : ''}>
  //         <React.Suspense
  //           fallback={<div className="lazy-loading">Loading...</div>}
  //         >
  //           <Routes>
  //             {/*               
  //             {publicRoutes.map((route, i) => (
  //               // <GuestRoute key={i} {...route} />
  //               <Route
  //                 key={i}
  //                 caseSensitive={route.caseSensitive}
  //                 path={route.path}
  //                 element={<GuestRoute>{route.component}</GuestRoute>}
  //               />
  //             ))}
  //             {!isEmptyObjectOrNullUndefiend(privateRouteList) ?
  //               <>

  //                 {privateRouteList.map((route, i) => (
  //                   // <GuestRoute key={i} {...route} />

  //                   <Route
  //                     key={i}
  //                     caseSensitive={route.caseSensitive}
  //                     path={route.path}
  //                     element={<AuthRoute>{route.component}</AuthRoute>}
  //                   />
  //                 ))}
  //               </> : <Route path="*" element={<NotFound />} />}
  //               <Route path="*" element={<NotFound />} /> */}

  //             {!isEmptyObjectOrNullUndefiend(publicRoutes) && !isEmptyObjectOrNullUndefiend(privateRouteList) ?
  //               <>
  //                 {publicRoutes.map((route, i) => (
  //                   // <GuestRoute key={i} {...route} />
  //                   <Route
  //                     key={i}
  //                     caseSensitive={route.caseSensitive}
  //                     path={route.path}
  //                     element={<GuestRoute>{route.component}</GuestRoute>}
  //                   />
  //                 ))} <Route path="*" element={<NOTFOUND />} /> </> : <></>}
  //             {!isEmptyObjectOrNullUndefiend(privateRouteList) ?
  //               <>


  //                 {privateRouteList?.map((route, i) => (
  //                   // <GuestRoute key={i} {...route} />

  //                   // !isNullUndefinedOrBlank(route.accessType) ?

  //                   <Route
  //                     key={i}
  //                     caseSensitive={route.caseSensitive}
  //                     path={route.path}
  //                     element={<AuthRoute>{route.component}</AuthRoute>}
  //                   />
  //                   // :
  //                   // <Route path="/access-denied" element={<AccessDenied />} />
  //                 ))}

  //                 <Route path="*" element={<NOTFOUND />} />
  //               </> : <></>
  //             }
  //             {/* <Route path="/session-expired" element={<SessionExpired />} /> */}
  //           </Routes>
  //         </React.Suspense>
  //       </div>
  //       {/* {isAuthenticated && <Footer />} */}
  //     </Router>
  //   </div>
  // )
  // role sight end
  return (

    <div className={isAuthenticated ? 'layout-wrapper' : ''} id={isAuthenticated ? "layout-wrapper" : ''}>
      <Router>
        {isAuthenticated && (

          <Navbar />
        )}

        {isAuthenticated && (

          <Sidebar />
        )}
        <div className={isAuthenticated ? 'main-content' : ''}>
          <React.Suspense
            fallback={<div className="lazy-loading">Loading...</div>}
          >
            <Routes>
              {publicRoutes.map((route, i) => (
                // <GuestRoute key={i} {...route} />
                <Route
                  key={i}
                  caseSensitive={route.caseSensitive}
                  path={route.path}
                  element={<GuestRoute>{route.component}</GuestRoute>}
                />
              ))}

              {privateRoutes.map((route, i) => (
                // <GuestRoute key={i} {...route} />

                // route.isShow===true? 
                <Route
                  key={i}
                  caseSensitive={route.caseSensitive}
                  path={route.path}
                  element={<AuthRoute>{route.component}</AuthRoute>}
                />
                // :
                //  <Route path="*" element={<NotFound />} />


              ))}

              <Route path="*" element={<NotFound />} />


            </Routes>
          </React.Suspense>
        </div>
      </Router>
    </div>
    // <div>routes</div>
  )
}


export default AppRouter;

