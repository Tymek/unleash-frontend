import { ApiTokenList } from '../apiToken/ApiTokenList/ApiTokenList';
import AdminMenu from '../menu/AdminMenu';
import ConditionallyRender from 'component/common/ConditionallyRender';
import AccessContext from 'contexts/AccessContext';
import { useContext } from 'react';

const ApiPage = () => {
    const { isAdmin } = useContext(AccessContext);

    return (
        <div>
            <ConditionallyRender condition={isAdmin} show={<AdminMenu />} />
            <ApiTokenList />
        </div>
    );
};

export default ApiPage;
