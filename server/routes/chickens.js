router.post('/', verifyToken, async (req, res) => {
  const { name, breed, age, weight, quantity } = req.body
  try {
    const chicken = new Chicken({ name, breed, age, weight, quantity })
    await chicken.save()
    res.status(201).json({ message: 'Chicken added!' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add chicken' })
  }
})