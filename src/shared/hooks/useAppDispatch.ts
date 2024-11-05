import { AppDispatch } from "@/app/providers/store/store";
import { useDispatch } from "react-redux";


export const useAppDispatch = () => useDispatch<AppDispatch>()