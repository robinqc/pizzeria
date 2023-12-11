import { CardContent } from "@mui/joy";
import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface TablesViewProps {}

const tables = [
    {
        id: 1,
        name: "Mesa 1",
        capacity: 4,
        status: "available",
    },
    {
        id: 2,
        name: "Mesa 2",
        capacity: 4,
        status: "available",
    },
    {
        id: 3,
        name: "Mesa 3",
        capacity: 4,
        status: "available",
    },
    {
        id: 4,
        name: "Mesa 4",
        capacity: 4,
        status: "available",
    },
    {
        id: 5,
        name: "Mesa 5",
        capacity: 4,
        status: "available",
    },
    {
        id: 6,
        name: "Mesa 6",
        capacity: 4,
        status: "available",
    },
];

const TablesView: FunctionComponent<TablesViewProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <Typography variant="h3">Mesas</Typography>
            <Grid
                container
                spacing={2}
                sx={{
                    marginTop: 2,
                }}
            >
                {tables.map((table) => (
                    <Grid item xs={6} md={6} lg={4}>
                        <Card
                            sx={{
                                height: 100,
                            }}
                        >
                            <CardActionArea
                                sx={{
                                    height: "100%",
                                }}
                                onClick={() => {
                                    navigate(`/tables/${table.id}`);
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h5">{table.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default TablesView;
