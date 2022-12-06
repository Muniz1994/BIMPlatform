import ifcopenshell

def random_function(ifc_file_path, ifc_class):
    ifc_file = ifcopenshell.open(ifc_file_path)

    elements = ifc_file.by_type(ifc_class)

    elements_names =  [ {"name":element.Name, "guid":(element.GlobalId)[0:3]} for element in elements]

    return elements_names