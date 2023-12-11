import "@fontsource/inter";
import { CssBaseline } from "@mui/joy";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewPizzaContextProvider } from "./contexts/NewPizzaContext";
import { OrderContextProvider } from "./contexts/OrderContext";
import "./index.css";
import MobileLayout from "./layouts/MobileLayout";
import TableView from "./views/TableView";
import TablesView from "./views/TablesView";

const theme = createTheme();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MobileLayout>
                <TablesView />
            </MobileLayout>
        ),
    },
    {
        path: "/tables/:id",
        element: (
            <OrderContextProvider>
                <NewPizzaContextProvider>
                    <TableView />
                </NewPizzaContextProvider>
            </OrderContextProvider>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
