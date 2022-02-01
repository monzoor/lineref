import { Page } from '@components';

const Home = () => {
  return (
    <Page>
      <div className="home mt-6">
        <p className="text-center text-xl font-bold text-secondary mb-2">
          User Analyzer
        </p>
        <p className="text-center text-gray-dark">
          Select filters to generate report
        </p>
      </div>
    </Page>
  );
};

export default Home;
