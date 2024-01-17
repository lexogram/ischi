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
  Frame,
  Home,
  OnBoard,
  NotFound,
  Play,
  RequireLogin
} from "./Routes/"
import "./SCSS/app.scss"

function App() {

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
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="confirm/:token" element={<Confirm />} />
            <Route path="contact" element={<Contact />} />
            <Route path="create" element={<Create />} />
            <Route path="credits" element={<Credits />} />
            <Route path="details" element={<Details />} />
            <Route path="login" element={<OnBoard />} />
            {/* Allow /play route to specify group and user */}
            <Route path="play">
              <Route
                path=":group/:user/*"
                element={<Play />}
              />
              <Route
                path=":group/"
                element={<Play />}
              />
              <Route
                path=""
                element={<Play />}
              />
            </Route>

            {/*  CATCHALL FOR ALL UNLISTED PATHS */}
            <Route path="not-found/*" element={<NotFound />} />

            {/* PRIVATE "onboard" ROUTES */}
            <Route
              path="o/*"
              element={
                <RequireLogin
                  redirectTo="../login"
                >
                  <Routes>
                    <Route
                      path="account/:user_id/*"
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
