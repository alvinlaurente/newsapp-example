import { Link } from 'react-router-dom'
import { Search } from '../components'

const Navbar = () => {
	const renderTopic = () => {
		const topicsComponent = []
		const topics = [
			'Indonesia',
			'World',
			'Politic',
			'Business',
			'Economy',
			'Health',
			'Sport',
			'Technology',
			'Travel',
			'Entertainment',
			'Culinary',
			'Game'
		]

		topics.map((topic) => {
			const url = `/search?q=${topic}&limit=12&page=1`
			const url2 = `/topic/${topic}`
			topicsComponent.push(
				<Link key={topic} to={url2}>
					<div className="w-full h-12 flex flex-row justify-items-center items-center hover:text-[#7404FA]">
						<p className="font-bold">{topic}</p>
					</div>
				</Link>
			)
		})

		return topicsComponent
	}
  return (
		<div className='bg-[#a790a7] py-2'>
			<div className='flex flex-row items-center justify-between container mx-auto'>
				<Link to="/">
					<div className="w-full h-12 flex flex-row justify-items-center items-center hover:text-[#7404FA]">
						<p className="font-bold text-xl">React News</p>
					</div>
				</Link>
				<div className='flex flex-row gap-8'>
					{ renderTopic() }
				</div>
				<Search />
			</div>
		</div>
  );
};

export default Navbar;
