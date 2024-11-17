const asyncHandler = (fn) => async(req,res,next) =>{ // higher order function
    try {
        await fn(req,res,next)

    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            error:error.message
        })
    }

}

export { asyncHandler }