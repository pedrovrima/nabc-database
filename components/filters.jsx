import { Input, Checkbox } from "@chakra-ui/input";

export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined);
    }, 200);
  
    return (
      <span>
        Search:{" "}
        <Input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0"
          }}
        />
      </span>
    );
  }
  
  export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
  }) {
  
    const options = React.useMemo(
      () => {
        const options = new Set();
        preFilteredRows.forEach(row => {
          options.add(row.values[id]);
        });
        return [...options.values()];
      },
      [id, preFilteredRows]
    );
  
    const [selected, setSelected] = useState(options);
  
    const changeFunc = e => {
      e.target.value == "all"
        ? setSelected(undefined)
        : filterValue
          ? filterValue.indexOf(e.target.value) > -1
            ? setSelected(filterValue.filter(val => val !== e.target.value))
            : setSelected([...filterValue, e.target.value])
          : setSelected([e.target.value] || undefined);
    };
  
    useEffect(
      () => {
        selected.length?
        setFilter(selected):
        setSelected(options);
        ;
        
      },
      [selected]
    );
  
    // Calculate the options for filtering
    // using the preFilteredRows
    console.log(filterValue);
    // Render a multi-select box
    return (
      <div>
        {/* <option value="all">All</option> */}
        {options.map((option, i) =>
          <Checkbox isChecked={selected.indexOf(option)>-1} onChange={(e)=>changeFunc(e)} key={i} value={option}>
            {option}
          </Checkbox>
        )}
        </div>
    );
  }
  
  export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
  }) {
    const count = preFilteredRows.length;
  
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }
  
  