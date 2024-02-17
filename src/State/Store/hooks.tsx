import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

type DispatchFunc = () => AppDispatch

// Définition des fonctions useSelector et useDispatch adaptées à TypeScript
export const useAppDispatch: DispatchFunc = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector