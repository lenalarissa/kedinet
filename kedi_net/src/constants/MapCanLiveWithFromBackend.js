const mapCanLiveWithFromBackend = (backendCanLiveWith) => {
    const canLiveWithMappings = {
        "CALM_PEOPLE_ONLY": "Calm people only",
        "CHILDREN": "Children",
        "DOGS": "Dogs",
        "CATS": "Cats"
    };

    return canLiveWithMappings[backendCanLiveWith] || backendCanLiveWith;
};

export { mapCanLiveWithFromBackend };
