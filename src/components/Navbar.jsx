import { Link } from 'react-router-dom'
import { Search } from '../components'

const Navbar = () => {
  return (
		<div className='bg-[#a790a7] py-2'>
			<div className='flex flex-row items-center justify-between container mx-auto'>
				<Link to="/">
					<div className="px-4 w-full h-12 flex flex-row justify-items-center items-center">
						<p className="font-bold text-xl">React News</p>
					</div>
				</Link>
				<Search />
			</div>
		</div>
  );
};

export default Navbar;
