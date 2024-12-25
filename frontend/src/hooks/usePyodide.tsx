import { loadPyodide, PyodideInterface } from 'pyodide';
import { useEffect, useMemo, useRef, useState } from 'react';

export const usePyodide = (
	indexURL: string,
	packages?: string[],
	microPipPackages?: string[]
) => {
	const [pyodide, setPyodide] = useState<PyodideInterface>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<unknown>(null);
	const pyodideRef = useRef<PyodideInterface>(null);

	const stablePackages = useMemo(() => packages, [packages]);
	const stableMicroPipPackages = useMemo(
		() => microPipPackages,
		[microPipPackages]
	);

	useEffect(() => {
		const loadPyodideInstance = async () => {
			try {
				setIsLoading(true);
				const pyodideInstance = await loadPyodide({ indexURL });
				if (stablePackages?.length) {
					await pyodideInstance.loadPackage(stablePackages);
				}
				pyodideInstance.globals.set('pyodide', pyodideInstance);
				pyodideRef.current = pyodideInstance;
				setPyodide(pyodideInstance);
				const micropip = await pyodideInstance.pyimport('micropip');
				if (stableMicroPipPackages?.length) {
					await micropip.install(stableMicroPipPackages);
				}
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		loadPyodideInstance();
	}, [indexURL, stablePackages, stableMicroPipPackages]);

	return { pyodide, isLoading, error };
};
