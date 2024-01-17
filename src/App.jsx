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
  Frame,
  Home,
  OnBoard,
  NotFound,
  Play,
  RequireLogin
} from "./Routes/"

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
            <Route path="login" element={<OnBoard />} />
            <Route path="play" element={<Play />} />
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

                    {/*  CATCHALL FOR UNLISTED PRIVATE PATHS */}
                    <Route
                      path="*" element={
                      <Navigate
                        to="../not-found/at-all"
                        replace={true}
                      />}
                    />
                  </Routes>
                </RequireLogin>
              }
            />
          </Route>

          {/* CATCHALL FOR UNLISTED PUBLIC PATHS */}
          <Route path="*" element={
            <Navigate
              to="not-found"
              replace={true}
            />}
          />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
