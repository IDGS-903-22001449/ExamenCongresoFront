import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "./Home";
import Participantes from "./Participantes";
import Registro from "./Registro";
import Gafete from "./Gafete";

export const router = createBrowserRouter([
    {
        path: "/",
        element:  <LayoutPublic />,
        errorElement: <NotFound />,
        children : [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "/participantes",
                element: <Participantes />
            },
            {
                path: "/registro",
                element: <Registro />
            },
            {
                path: "/gafete/:id",
                element: <Gafete />
            }
        ]
    }
])