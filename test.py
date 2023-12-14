# Implementing the Fibonacci series using memoization
fib_cache = {}

def fib(n):
    if n <= 1:
        return n
    elif n in fib_cache:
        return fib_cache[n]
    else:
        fib_cache[n] = fib(n-1) + fib(n-2)
        return fib_cache[n]

n = int(input("Enter the number of terms: "))
print("Fibonacci sequence:")
for i in range(n):
    print(fib(i))