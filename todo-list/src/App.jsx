import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Body } from './components/Body/Body';
import Counter from './components/Tests/Counter';
import { Showtext } from './components/Tests/Showtext';
import { Products } from './components/Tests/Products';

function App() {

  return (
    <>
      <Header />
      <Counter />
      <Showtext />
      <Products />
      <Body />
      <Footer />
    </>
  )
}

export default App
