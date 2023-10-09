import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import OfflineModal from './offLine';
import { act } from 'react-dom/test-utils';



describe('OfflineModalComponent', () => {
    it('switches offline and back online', () => {
        const mockInternetConnection = (status: string) => {
        const events: { [key: string]: any } = {};
            jest.spyOn(window, 'addEventListener').mockImplementation((event, handle, options?) => {
                events[event] = handle;
            });
            const goOffline = new window.Event(status);
            act(() => {
                window.dispatchEvent(goOffline);
            });
        };
        render(<OfflineModal />);
        mockInternetConnection('offline');
        expect(screen.getByText('Connection Status: Offline')).toBeInTheDocument();
        mockInternetConnection('online');
        expect(screen.getByText('Connection Status: SwitchingOnline')).toBeInTheDocument();
    });
});