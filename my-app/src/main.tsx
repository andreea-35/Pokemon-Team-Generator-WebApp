import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PokemonSlot from './Components/PokemonSlot/PokemonSlot.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonSlot name={'aromatisse'} type={'fairy'}/>
  </StrictMode>,
)
