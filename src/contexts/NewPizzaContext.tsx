import { FC, createContext, useContext, useEffect, useState } from "react";

export enum PizzaSize {
    personal = "P",
    medium = "M",
    familiar = "F",
}

export const pizzaSizes = {
    [PizzaSize.personal]: "Personal",
    [PizzaSize.medium]: "Mediana",
    [PizzaSize.familiar]: "Familiar",
};

export enum PizzaType {
    whole = "entera",
    half = "media",
}

export const pizzaTypes = [
    {
        label: "Entera",
        value: PizzaType.whole,
    },
    {
        label: "Media",
        value: PizzaType.half,
    },
];

interface NewPizzaContextData {
    size: PizzaSize;
    setSize: (value: PizzaSize) => void;
    type: PizzaType;
    setType: (value: PizzaType) => void;
    quantity: number;
    products: any[];
    addProduct: (value: any) => void;
    removeProduct: (value: any) => void;
    setProducts: (value: any[]) => void;
    setQuantity: (value: number) => void;
    extraIngredients: string[];
    addExtraIngredient: (value: string) => void;
    removeExtraIngredient: (value: string) => void;
    pastaItem: any;
    setPastaItem: (value: any) => void;
    reset: () => void;
}

export const PizzaContext = createContext<NewPizzaContextData>({
    size: PizzaSize.medium,
    setSize: () => {},
    type: PizzaType.whole,
    setType: () => {},
    quantity: 1,
    products: [],
    addProduct: () => {},
    removeProduct: () => {},
    setProducts: () => {},
    setQuantity: () => {},
    extraIngredients: [],
    addExtraIngredient: () => {},
    removeExtraIngredient: () => {},
    pastaItem: null,
    setPastaItem: () => {},
    reset: () => {},
});

export const NewPizzaContextProvider: FC<{ children: any }> = ({ children }) => {
    const [size, setSize] = useState<PizzaSize>(PizzaSize.medium);
    const [type, setType] = useState<PizzaType>(PizzaType.whole);
    const [quantity, setQuantity] = useState<number>(1);
    const [extraIngredients, setExtraIngredients] = useState<string[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [pastaItem, setPastaItem] = useState<any>(null);

    useEffect(() => {
        setProducts([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const addProduct = (value: any) => {
        setProducts([...products, value]);
    };

    const removeProduct = (value: any) => {
        setProducts(products.filter((product) => product.id !== value.id));
    };

    const addExtraIngredient = (value: string) => {
        setExtraIngredients([...extraIngredients, value]);
    };

    const removeExtraIngredient = (value: string) => {
        setExtraIngredients(extraIngredients.filter((ingredient) => ingredient !== value));
    };

    const reset = () => {
        setSize(PizzaSize.medium);
        setType(PizzaType.whole);
        setQuantity(1);
        setExtraIngredients([]);
        setProducts([]);
    };

    return (
        <PizzaContext.Provider
            value={{
                size,
                setSize,
                type,
                setType,
                quantity,
                setQuantity,
                extraIngredients,
                addExtraIngredient,
                removeExtraIngredient,
                reset,
                products,
                addProduct,
                setProducts,
                removeProduct,
                pastaItem,
                setPastaItem,
            }}
        >
            {children}
        </PizzaContext.Provider>
    );
};

export const usePizzaContext = () => {
    return useContext(PizzaContext);
};
