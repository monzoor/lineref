import { FC } from 'react';

import { Button, BUTTON_VARIANT, Page } from '@components';
import { PAGES } from '@constants/pages';

const NotFound: FC = () => {
  return (
    <Page>
      <div className="grid grid-cols-1 h-screen items-center border justify-items-center">
        <p className="text-5xl text-blue-500">404 Not Found</p>
        <Button
          text="Go back to home"
          variant={BUTTON_VARIANT.PRIMARY}
          className="mt-4 w-1/2 text-center"
          to={PAGES.HOME}
        />
      </div>
    </Page>
  );
};

export default NotFound;
