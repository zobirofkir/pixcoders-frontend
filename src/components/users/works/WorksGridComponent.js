import WorkCard from './WorkCardComponent';

const WorksGridComponent = ({ works, visibleWorks, onLoadMore }) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.slice(0, visibleWorks).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {visibleWorks < works.length && (
          <div className="text-center mt-12">
            <button
              onClick={onLoadMore}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorksGridComponent;
