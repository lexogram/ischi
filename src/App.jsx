import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Provider } from "./Contexts"
import {
  About,
  Account,
  Confirm,
  Contact,
  Create,
  Credits,
  Details,
  Event,
  Frame,
  Home,
  Connection,
  NotFound,
  Play,
  Print,
  RequireLogin,
  Reset
} from "./Routes/"
import "./SCSS/app.scss"
import { useScrollSize } from './Hooks/useScrollSize'


function App() {
  // Set --scroll-size custom CSS property in App.css to OS value
  const scrollSize = useScrollSize()
  document.documentElement.style.setProperty(
    '--scroll-size', scrollSize + 3 + "px"
  );

  return (
    <Router
      future={{ v7_startTransition: true }}
    >
      <Provider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={<Frame />}
          >
            {/* Paths wrapped by Frame go here */}
            {/* Paths that end with /* will ignore extra params */}
            {/* <Route index element={<Home />} /> */}
            <Route index element={<Connection />} />
            <Route path="about" element={<About />} />
            <Route path="confirm/:token" element={<Confirm />} />
            <Route path="contact" element={<Contact />} />
            <Route path="create" element={<Create />} />
            <Route path="credits" element={<Credits />} />
            <Route path="details" element={<Details />} />
            <Route path="connection" element={<Connection />} />
            <Route path="print" element={<Print />} />
            <Route path="reset" element={<Reset />} />
            {/* Allow /play route to specify room and user */}
            <Route path="play">
              <Route
                path=":room/:user/*"
                element={<Play />}
              />
              <Route
                path=":room/"
                element={<Play />}
              />
              <Route
                path=""
                element={<Play />}
              />
            </Route>
            <Route path="event">
              <Route
                path=":organization/:room_host/*"
                element={<Event />}
              />
              <Route
                path=":organization/"
                element={<Event />}
              />
              <Route
                path=""
                element={<Event />}
              />
            </Route>

            {/*  CATCHALL FOR ALL UNLISTED PATHS */}
            <Route path="not-found/*" element={<NotFound />} />

            {/* PRIVATE "Connection" ROUTES */}
            <Route
              path="o/*"
              element={
                <RequireLogin
                  redirectTo="../connection"
                >
                  <Routes>
                    <Route
                      path="account/:user_id/*"
                      element={<Account />}
                    />
                    <Route
                      path="account"
                      element={<Account />}
                    />

                    {/* REDIRECT FOR UNLISTED PRIVATE PATHS */}
                    <Route
                      path="*" element={
                      <Navigate
                        to="../not-found/there"
                        replace={true}
                      />}
                    />
                  </Routes>
                </RequireLogin>
              }
            />
          </Route>

          {/* REDIRECT FOR UNLISTED PUBLIC PATHS */}
          <Route path="*" element={
            <Navigate
              to="not-found/here"
              replace={true}
            />}
          />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
