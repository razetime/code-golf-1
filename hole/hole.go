package hole

import (
	"constraints"
	"math/rand"
)

func max[T constraints.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func min[T constraints.Ordered](a, b T) T {
	if a < b {
		return a
	}
	return b
}

// Note: Returning the slice is a convenience, the shuffle is still in-place.
func shuffle[Elem any](s []Elem) []Elem {
	rand.Shuffle(len(s), func(i, j int) { s[i], s[j] = s[j], s[i] })
	return s
}
