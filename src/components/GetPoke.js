export const GetPoke = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("f")) {
            return JSON.parse(localStorage.getItem("f"));
        }
    }
    return [];
};
